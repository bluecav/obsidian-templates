---
folder: 90 - Templates/10 - Notes
tags: ""
title: project-note
---

`<%* 
let subProject = ""
const currentFile = app.workspace.getActiveFile();
const pathArray= currentFile.path.split("/");

if (pathArray.length > 1) {
	// -1 will be the markdown file itself
	subProject=pathArray.at(-2)
}

await app.fileManager.processFrontMatter(currentFile, (frontmatter) => {
	frontmatter["subProject"] = subProject; 
});
%>

# Project Note

test




