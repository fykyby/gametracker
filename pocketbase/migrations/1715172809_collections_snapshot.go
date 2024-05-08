package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `[
			{
				"id": "_pb_users_auth_",
				"created": "2024-02-28 12:26:41.165Z",
				"updated": "2024-04-02 21:59:29.610Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_G4gYpv9` + "`" + ` ON ` + "`" + `users` + "`" + ` (` + "`" + `username` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "id = @request.auth.id",
				"createRule": "",
				"updateRule": "id = @request.auth.id",
				"deleteRule": "id = @request.auth.id",
				"options": {
					"allowEmailAuth": true,
					"allowOAuth2Auth": false,
					"allowUsernameAuth": false,
					"exceptEmailDomains": null,
					"manageRule": null,
					"minPasswordLength": 6,
					"onlyEmailDomains": null,
					"onlyVerified": false,
					"requireEmail": true
				}
			},
			{
				"id": "g1oxno8kidhx0ij",
				"created": "2024-02-28 17:11:51.056Z",
				"updated": "2024-04-02 21:59:29.610Z",
				"name": "listItems",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "ohewbtuu",
						"name": "user",
						"type": "relation",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "_pb_users_auth_",
							"cascadeDelete": true,
							"minSelect": null,
							"maxSelect": 1,
							"displayFields": null
						}
					},
					{
						"system": false,
						"id": "5d0d5mza",
						"name": "rawgId",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": 0,
							"max": null,
							"noDecimal": true
						}
					},
					{
						"system": false,
						"id": "dj8ykuvu",
						"name": "title",
						"type": "text",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"min": null,
							"max": null,
							"pattern": ""
						}
					},
					{
						"system": false,
						"id": "v54lym1g",
						"name": "status",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": 1,
							"max": 5,
							"noDecimal": true
						}
					},
					{
						"system": false,
						"id": "bcfftiuf",
						"name": "rating",
						"type": "number",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"min": 0,
							"max": 10,
							"noDecimal": true
						}
					}
				],
				"indexes": [
					"CREATE INDEX ` + "`" + `idx_FxKVrtm` + "`" + ` ON ` + "`" + `listItems` + "`" + ` (\n  ` + "`" + `rawgId` + "`" + `,\n  ` + "`" + `user` + "`" + `\n)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.auth.id = user.id",
				"updateRule": "@request.auth.id = user.id",
				"deleteRule": "@request.auth.id = user.id",
				"options": {}
			}
		]`

		collections := []*models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collections); err != nil {
			return err
		}

		return daos.New(db).ImportCollections(collections, true, nil)
	}, func(db dbx.Builder) error {
		return nil
	})
}
