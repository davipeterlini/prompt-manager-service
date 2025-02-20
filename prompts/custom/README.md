# Running Prompts with Coder

This README provides instructions on how to run the prompts using the `coder` command-line interface.

## Prerequisites

Ensure that you have the `coder` CLI installed and properly configured. If not, follow the installation instructions in the main project README.

## Running Prompts

To run a prompt with the `coder` CLI, use the following command format:

```sh
coder run -b <key1>=<value1> -b <key2>=<value2> -f <path_to_prompt_file>
```

### Example

Here is an example of how to run a prompt with the `coder` CLI:

```sh
coder run -b language=Python -b framework=Flask -b database=SQLite -f ~/prompts/custom/create-backend-example.md
```

### Parameters

- `-b <key>=<value>`: Bind a key to a value. You can use multiple `-b` options to bind multiple keys.
- `-f <path_to_prompt_file>`: Specify the path to the prompt file.

### Notes

- Use the [coder:save]...[coder:end] syntax.
- Ensure that the prompt file follows the structure and guidelines provided in the prompt.

## Available Prompts

### Backend Example

```sh
coder run -b language=Python -b framework=Flask -b database=SQLite -f ~/prompts/custom/create-backend-example.md
```

### Frontend Example

```sh
coder run -b language=JavaScript -b framework=React -b state_management=Redux -b styling_framework=Bootstrap -b app_name=MyApp -f ~/prompts/custom/create-frontend-example.md
```

### README Example

```sh
coder run -f ~/prompts/custom/create-readme-example.md
```

### Code Repository Extract

```sh
coder run -b text="specific logic or concept" -b file_extention="All extention" -b linguage="pt-br" -f ~/prompts/custom/code-repo-extract.md
```

### Code Repository Scanner

```sh
coder run -b info="specific logic or concept" -b linguage="pt-br" -f ~/prompts/custom/code-repo-scanner.md
```

## Conclusion

By following the instructions above, you can run the prompts using the `coder` CLI to generate various code templates and documentation. Make sure to replace the placeholder values with actual values as needed.