package main

import (
	"errors"
	"github.com/drone/envsubst"
	"github.com/laontme/envium/internal/pkg/env"
	"github.com/urfave/cli/v2"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"strings"
)

var app *cli.App

var authors = []*cli.Author{
	{Name: "Stanislav Smirnov", Email: "stanislav@laont.me"},
}

var version = "0.3.0"

func init() {
	log.SetPrefix("envium: ")
	log.SetFlags(0)

	app = cli.NewApp()

	app.Name = "envium"
	app.Usage = "Compile files with variables"
	app.Authors = authors
	app.Copyright = "Copyright (c) 2022 Stanislav Smirnov"
	app.Version = version
	app.HideHelpCommand = true

	app.Flags = []cli.Flag{
		&cli.StringFlag{
			Name:     "input",
			Required: true,
			Aliases:  []string{"i"},
			Usage:    "path to input directory",
		},
		&cli.StringFlag{
			Name:     "output",
			Required: true,
			Aliases:  []string{"o"},
			Usage:    "path to output directory",
		},
		&cli.StringSliceFlag{
			Name:     "vars",
			Required: false,
			Usage:    "variables",
		},
	}

	app.Action = actionCompile
}

func main() {
	err := app.Run(os.Args)
	if err != nil {
		log.Fatal(err)
	}
}

func actionCompile(c *cli.Context) error {
	var env2 map[string]string
	var err error
	if c.IsSet("vars") {
		env2, err = env.Parse(c.StringSlice("vars"))
		if err != nil {
			log.Fatal(err)
		}
	} else {
		env2, err = env.Parse(os.Environ())
		if err != nil {
			log.Fatal(err)
		}
	}

	inputPath := c.String("input")
	outputPath := c.String("output")

	// Check if input is not directory
	fiInput, err := os.Stat(inputPath)
	if err != nil {
		log.Fatal(err)
	}

	if !fiInput.IsDir() {
		return errors.New("input is not directory")
	}

	// Check if output is not directory
	fiOutput, err := os.Stat(outputPath)
	if err != nil {
		log.Fatal(err)
	}

	if !fiOutput.IsDir() {
		return errors.New("output is not directory")
	}

	filepath.WalkDir(inputPath, func(path string, d fs.DirEntry, err error) error {
		fi, err := os.Stat(path)
		if err != nil {
			log.Fatal(err)
		}

		// Skip if path is directory
		if fi.IsDir() {
			return nil
		}

		input := path
		output := strings.Replace(filepath.Clean(path), filepath.Clean(inputPath), filepath.Clean(outputPath), 1)

		file, err := os.ReadFile(input)
		if err != nil {
			return err
		}

		compiled, _ := envsubst.Eval(string(file), func(s string) string {
			return env2[s]
		})

		os.MkdirAll(filepath.Dir(output), 0777)
		err = os.WriteFile(output, []byte(compiled), fi.Mode())
		if err != nil {
			return err
		}

		return nil
	})

	return nil
}
