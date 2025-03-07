# Contributing to BIPOCA AI

First off, thank you for considering contributing to BIPOCA AI! It's people like you that make BIPOCA AI such a great tool for education and empowerment.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

1. **Check Existing Issues** - Check if the bug has already been reported
2. **Create a Clear Report** - Include:
   - A clear title and description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Your environment details

### Suggesting Enhancements

1. **Check Existing Suggestions** - Your idea might have been discussed before
2. **Provide Context** - Explain why this enhancement would be useful
3. **Consider Scope** - How will it impact existing users?

### Pull Requests

1. **Fork the Repository**
2. **Create a Branch** - Name it descriptively, e.g., `fix-authentication-flow`
3. **Make Your Changes**
   - Follow the coding style
   - Add tests if applicable
   - Update documentation
4. **Test Your Changes**
   - Run `npm run test`
   - Run `npm run lint`
5. **Create Pull Request**
   - Reference any related issues
   - Provide a clear description
   - Include screenshots for UI changes

## Development Setup

1. **Prerequisites**
   - Node.js 20.x
   - npm 10.x
   - Firebase project

2. **Installation**
   ```bash
   git clone https://github.com/your-username/bipoca_ai_new.git
   cd bipoca_ai_new
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run dev
   ```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid using `any`

### React

- Use functional components
- Follow React hooks best practices
- Keep components small and focused

### Styling

- Use TailwindCSS classes
- Follow the design system
- Ensure accessibility compliance

### Testing

- Write tests for new features
- Maintain test coverage
- Test across different themes

## Git Commit Guidelines

- Use clear commit messages
- Reference issues when applicable
- Keep commits focused and atomic

## Documentation

- Update README.md if needed
- Document new features
- Update API documentation
- Include JSDoc comments

## Accessibility

- Maintain WCAG 2.1 compliance
- Test with screen readers
- Support keyboard navigation
- Consider color contrast

## Questions?

Feel free to ask for help! Open an issue or contact the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
