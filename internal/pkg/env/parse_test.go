package env

import (
	"reflect"
	"testing"
)

func TestParseNormal(t *testing.T) {
	input := []string{"VAR=value"}
	want := EnvMap{"VAR": "value"}
	output, _ := Parse(input)
	if !reflect.DeepEqual(want, output) {
		t.Errorf("Parse(%v) = %v; want %v", input, output, want)
	}
}

func TestParseSpace(t *testing.T) {
	input := []string{" VAR = value"}
	want := EnvMap{"VAR": "value"}
	output, _ := Parse(input)
	if !reflect.DeepEqual(want, output) {
		t.Errorf("Parse(%v) = %v; want %v", input, output, want)
	}
}

func TestParseBroken(t *testing.T) {
	input := []string{"VAR: value"}
	want := EnvMap{}
	output, err := Parse(input)
	if !reflect.DeepEqual(want, output) || err == nil {
		t.Errorf("Parse(%v) = %v, %v; want %v, !nil", input, output, err, want)
	}
}
