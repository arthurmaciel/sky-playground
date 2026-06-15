var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/elm");
editor.textInput.getElement().id = "editor-textarea";
editor.textInput.getElement().name = "editor-textarea";

// codeMirror.value = editor.getValue();

editor.getSession().on("change", function() {
    var codeMirror = document.getElementById('code-mirror');
    codeMirror.value = editor.getValue();
    console.log(codeMirror.value);
});
