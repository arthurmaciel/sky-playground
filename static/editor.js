var editor = ace.edit("editor");
editor.session.setMode("ace/mode/elm");
editor.setFontSize(16);
editor.setOption("printMargin", false);
editor.textInput.getElement().id = "editor-textarea";
editor.textInput.getElement().name = "editor-textarea";

var aceMirror = document.getElementById('ace-mirror');
const exampleMirror = document.getElementById('example-mirror');
const exampleMirrorWrapper = document.getElementById('example-mirror-wrapper');
const themeSelectorWrapper = document.getElementById('theme-selector-wrapper');

editor.setTheme(themeSelectorWrapper ? themeSelectorWrapper.getAttribute('data-ace-theme') : "ace/theme/chrome");
initialCode = "-- Insert you code here or select an example above";
editor.setValue(initialCode, 0);
editor.focus();
editor.selection.moveCursorToPosition({row: 0, column: 0});
editor.selection.selectLine();

// Sync Ace editor and example-mirror
editor.session.on("change", () => {
  aceMirror.value = editor.getValue();
});

// Trigger initial sync
editor.getSession()._emit('change',
  {
    start: { row: 0, column: 0 },
    end: { row: 0, column: 0 },
    action: 'insert',
    lines: []
  }
);

// Apparently SSE diffs don't trigger JS 'change' events, 
// so MutationObserver is needed
var dropDownObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.id === exampleMirrorWrapper.id) {
      editor.setValue(exampleMirror.value, -1);
    } else if (mutation.target.id === themeSelectorWrapper.id) {
      const acePath = themeSelectorWrapper.getAttribute('data-ace-theme');
      editor.setTheme(acePath || "ace/theme/github_dark");
    }
  });
});

dropDownObserver.observe(exampleMirrorWrapper, {
  attributes: true,
});

dropDownObserver.observe(themeSelectorWrapper, {
  attributes: true,
});
