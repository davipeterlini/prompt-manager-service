# Curl Commands for Prompt Manager Application

## Create a Prompt

```sh
curl -X POST http://localhost:3000/prompts \
-H "Content-Type: application/json" \
-d '{
  "name": "Test Prompt",
  "description": "Test Description",
  "template": "Test Template"
}'
```

## Get All Prompts

```sh
curl -X GET http://localhost:3000/prompts
```

## Get a Single Prompt

```sh
curl -X GET http://localhost:3000/prompts/{id}
```

Replace `{id}` with the actual prompt ID.

## Update a Prompt

```sh
curl -X PUT http://localhost:3000/prompts/{id} \
-H "Content-Type: application/json" \
-d '{
  "name": "Updated Prompt",
  "description": "Updated Description",
  "template": "Updated Template"
}'
```

Replace `{id}` with the actual prompt ID.

## Delete a Prompt

```sh
curl -X DELETE http://localhost:3000/prompts/{id}
```

Replace `{id}` with the actual prompt ID.

## Get Custom Prompt

```sh
curl -X POST http://localhost:3000/prompts/custom/{id}
```

Replace `{id}` with the actual prompt ID.