export default function formatPascalCase(str: string): string {
	return str.replace(/([A-Z])/g, ' $1').trim();
}
