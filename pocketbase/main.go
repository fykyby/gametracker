package main

import (
	"log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	// uncomment once you have at least one .go migration file in the "migrations" directory
	_ "github.com/fykyby/gametracker/migrations"
)

func main() {
	app := pocketbase.New()

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: false,
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
