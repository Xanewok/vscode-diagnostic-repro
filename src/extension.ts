// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let diagnosticCollection: vscode.DiagnosticCollection;

function setDummyDiagnostic(uri: vscode.Uri) {
	let range = new vscode.Range(0, 0, 0, 1);
	let severity = vscode.DiagnosticSeverity.Error;
	let message = "mismatched types\n\nexpected enum `std::option::Option`, found struct `std::string::String`\n\nnote: expected type `std::option::Option<&std::string::String>`\n         found type `std::string::String`";
	let diagnostic = new vscode.Diagnostic(range, message, severity);
	diagnosticCollection.set(uri, [diagnostic]);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	diagnosticCollection = vscode.languages.createDiagnosticCollection('go');

	for (let doc of vscode.workspace.textDocuments) {
		setDummyDiagnostic(doc.uri);
	}
	vscode.workspace.onDidOpenTextDocument(doc => setDummyDiagnostic(doc.uri));

	context.subscriptions.push(diagnosticCollection);
}

// this method is called when your extension is deactivated
export function deactivate() { }


// let diagnosticCollection: vscode.DiagnosticCollection;

// export function activate(ctx: vscode.ExtensionContext): void {
//   ...
//   ctx.subscriptions.push(getDisposable());
//   diagnosticCollection = vscode.languages.createDiagnosticCollection('go');
//   ctx.subscriptions.push(diagnosticCollection);
//   ...
// }

// function onChange() {
//   let uri = document.uri;
//   check(uri.fsPath, goConfig).then(errors => {
//     diagnosticCollection.clear();
//     let diagnosticMap: Map<string, vscode.Diagnostic[]> = new Map();
//     errors.forEach(error => {
//       let canonicalFile = vscode.Uri.file(error.file).toString();
//       let range = new vscode.Range(error.line-1, error.startColumn, error.line-1, error.endColumn);
//       let diagnostics = diagnosticMap.get(canonicalFile);
//       if (!diagnostics) { diagnostics = []; }
//       diagnostics.push(new vscode.Diagnostic(range, error.msg, error.severity));
//       diagnosticMap.set(canonicalFile, diagnostics);
//     });
//     diagnosticMap.forEach((diags, file) => {
//       diagnosticCollection.set(vscode.Uri.parse(file), diags);
//     });
//   })
// }