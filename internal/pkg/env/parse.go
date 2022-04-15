package env

import (
	"errors"
	"strings"
)

type EnvMap map[string]string

func Parse(raws []string) (EnvMap, error) {
	variables := make(map[string]string)

	for _, raw := range raws {
		if strings.Count(raw, "=") != 1 {
			return EnvMap{}, errors.New("string `" + raw + "` contains too much or too few `=`")
		}

		parts := strings.Split(raw, "=")
		variables[strings.TrimSpace(parts[0])] = strings.TrimSpace(parts[1])
	}

	return variables, nil
}
