import { ExtensionContext, commands, window } from 'vscode';

export function activate(context: ExtensionContext) {

  // Define a command for the button
  const commandId = 'myExtension.sayHello';
  context.subscriptions.push(
    commands.registerCommand(commandId, () => {
      window.showInformationMessage('Hello from my BarkaBook!');
      addCodeToActiveCell();
    })
  );

  // Create a button on the toolbar of the notebook editor
  const button = window.createStatusBarItem(undefined, 100); 
  button.text = 'Say Hello';
  button.command = commandId;
  button.show();
  context.subscriptions.push(button);

  // Add code to the active cell
  function addCodeToActiveCell(): void {
    const editor = window.activeNotebookEditor;
    if (!editor) {
      window.showErrorMessage('No notebook editor available!');
      return;
    }
    const cell = editor.notebook.cellAt;
    if (!cell) {
      window.showErrorMessage('No active cell available!');
      return;
    }
    const position = cell.apply;
    position.caller.('console.log("Hello friend !");\n');
  }
}

export function deactivate() {}
