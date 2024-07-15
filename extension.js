const vscode = require("vscode");

function activate(){
    vscode.commands.registerCommand('extension.copyIt',()=>{
        const editor = vscode.window.activeTextEditor;
        if(editor){
            const selection = editor.selection;
            vscode.env.clipboard.writeText(editor.document.getText(selection));
        }
    })
    vscode.commands.registerCommand('extension.pasteIt',()=>{
        const editor = vscode.window.activeTextEditor;
        if (editor){
            const selection = editor.selection;
            editor.edit(editBuilder => {
                editBuilder.delete(selection);
            });
            
        }
        vscode.env.clipboard.readText().then(text => {
            editor.edit(editBuilder => {
                const position = editor.selection.active;
                editBuilder.insert(position, text);
            });
        });
    })
}

module.exports = {activate};