var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/elm");
editor.setFontSize(16);
editor.textInput.getElement().id = "editor-textarea";
editor.textInput.getElement().name = "editor-textarea";

initialCode = "-- Insert you code bellow or select an example above";
editor.setValue(initialCode, -1);

var aceMirror = document.getElementById('ace-mirror');
var exampleMirror = document.getElementById('example-mirror');
var exampleMirrorWrapper = document.getElementById('example-mirror-wrapper');
var themeSelectorWrapper = document.getElementById('theme-selector-wrapper');
var theme = document.getElementById('theme');

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
    console.log(`Mutation type: ${mutation.type}`);
    if (mutation.target.id === exampleMirrorWrapper.id) {
      editor.setValue(exampleMirror.value, -1);
    } else if (mutation.target.id === themeSelectorWrapper.id) {
      editor.setTheme("ace/theme/chrome");
    } else {
      console.log(`Mutation target: ${mutation.target.id}`);
    }
  });
});

dropDownObserver.observe(exampleMirrorWrapper, {
  attributes: true,
});

dropDownObserver.observe(themeSelectorWrapper, {
  childList: true,
  attributes: true,
  subtree: true,       // Only watch direct children (set true for all descendants)
  characterData: true
});

