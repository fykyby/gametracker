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
				"id": "1vka21g5ftbl3ly",
				"created": "2024-02-28 17:02:47.246Z",
				"updated": "2024-02-28 19:34:08.674Z",
				"name": "lists",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "wbfrbc6k",
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
						"id": "qr5zzsdh",
						"name": "isPrivate",
						"type": "bool",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {}
					}
				],
				"indexes": [
					"CREATE UNIQUE INDEX ` + "`" + `idx_ASnJ4aT` + "`" + ` ON ` + "`" + `lists` + "`" + ` (` + "`" + `user` + "`" + `)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": "",
				"updateRule": "@request.auth.id = user.id",
				"deleteRule": "@request.auth.id = user.id",
				"options": {}
			},
			{
				"id": "g1oxno8kidhx0ij",
				"created": "2024-02-28 17:11:51.056Z",
				"updated": "2024-03-01 20:10:38.230Z",
				"name": "listItems",
				"type": "base",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "g6ayblhf",
						"name": "list",
						"type": "relation",
						"required": true,
						"presentable": false,
						"unique": false,
						"options": {
							"collectionId": "1vka21g5ftbl3ly",
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
							"min": 0,
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
					"CREATE INDEX ` + "`" + `idx_FxKVrtm` + "`" + ` ON ` + "`" + `listItems` + "`" + ` (\n  ` + "`" + `list` + "`" + `,\n  ` + "`" + `rawgId` + "`" + `\n)"
				],
				"listRule": "",
				"viewRule": "",
				"createRule": "@request.auth.id = list.user.id",
				"updateRule": "@request.auth.id = list.user.id",
				"deleteRule": "@request.auth.id = list.user.id",
				"options": {}
			},
			{
				"id": "_pb_users_auth_",
				"created": "2024-03-01 18:41:25.758Z",
				"updated": "2024-03-01 18:41:25.769Z",
				"name": "users",
				"type": "auth",
				"system": false,
				"schema": [
					{
						"system": false,
						"id": "users_avatar",
						"name": "avatar",
						"type": "file",
						"required": false,
						"presentable": false,
						"unique": false,
						"options": {
							"mimeTypes": [
								"image/jpeg",
								"image/png",
								"image/svg+xml",
								"image/gif",
								"image/webp"
							],
							"thumbs": null,
							"maxSelect": 1,
							"maxSize": 5242880,
							"protected": false
						}
					}
				],
				"indexes": [],
				"listRule": "id = @request.auth.id",
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
