import * as path from "path";
import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "copy-filename.copyFilename",
    async (uri: vscode.Uri) => {
      let newUri = uri;

      if (!newUri) {
        await vscode.commands.executeCommand("copyFilePath");
        const filepath = await vscode.env.clipboard.readText();
        newUri = vscode.Uri.file(filepath);
      }

      await vscode.env.clipboard.writeText(path.basename(newUri.path));
    }
  );

  context.subscriptions.push(disposable);
}
