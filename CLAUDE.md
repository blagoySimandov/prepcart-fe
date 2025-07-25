## Naming Conventions

- Always use kebab-case for file namings in ts.

## Project Structure

- Always use index.ts main entry point. When creating components and functionality create a folder with index.ts. Then abstract complexity from it in files such as styles.ts, hooks.ts (for logic), constants.ts

## Code Best Practices

- Never hardcode any strings or magic numbers. If needed always use constants.ts and put the constants in there
- Limit the use of comments in the codebase as much as possible. Let the code speak for itself.
- When creating components if it makes sense group them by using the compound components pattern