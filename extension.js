// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('liquify.convertSelection', function () {
		//vscode.window.showInformationMessage('Converting selection...');

    const editor = vscode.window.activeTextEditor;
    if (!editor || (editor && !editor.selections) || (editor && editor.selections && editor.selections[0].isEmpty)) {
      vscode.window.showErrorMessage('⛔ Please select active text block and then run the conversion.');
      return; // no active text editor;
    };

    const selection = editor.selections[0];
    
    
    editor.edit(async (editBuilder) => {
      const editRange = new vscode.Range(selection.start, selection.end); // selection range
      const textContent = editor.document.getText(editRange); // selection text

      // @ts-ignore
      let editedText = `{%- liquid\n\t${textContent.replaceAll('{%-', '{%').replaceAll('-%}', '%}').replaceAll('{%','').replaceAll('%}','').replaceAll('\n{{ ', 'echo ').replaceAll('\n{{', 'echo ').replaceAll('}}','')}\n-%}\n`;
      editBuilder.replace(editRange, editedText);
      vscode.window.showInformationMessage('Liquify conversion is ready. Please see through converted code manually to see everything is in place.');
    });
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
