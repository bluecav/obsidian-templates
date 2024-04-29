---
folder: templates
icon: FarNoteSticky
tags: ""
title: daily-template
---

<%*
const DAILY_ROOT = "/daily-notes";
const FOLDER_NOTE_TEMPLATE="/templates/folder-note-brief"

let year = tp.date.now("YYYY", 0);
let month = tp.date.now("MM-MMMM", 0);
let day = tp.date.now("YYYY-MM-DD", 0);
let dir = DAILY_ROOT + "/" + year + "/" + month + "/" + day + "-📎/";
attachmentBrief=dir + "_about_"

if (!tp.file.exists(dir)) { 
	console.log("Creating " + dir)
	await this.app.vault.createFolder(dir)
} else {
	console.log(dir + " already exists")
}

if (!tp.file.exists(attachmentBrief) {
	console.log("Creating " + attachmentFile)
	await tp.file.create_new(tp.file.find_tfile(FOLDER_NOTE_TEMPLATE), attachmentFile)
}

tp.hooks.on_all_templates_executed(async () => {
  const file = tp.file.find_tfile(tp.file.path(true));
  await app.fileManager.processFrontMatter(file, (frontmatter) => {
    frontmatter["status"] = "In progress";
    frontmatter["review count"] += 1;
    delete frontmatter["ignored"];
  });
});

-%>

```ad-summary
title: **DATE:** 
{{date:YYYY-MM-DD}}

```
```ad-check
title: Tasks
collapse: open
```tasks
```
```ad-note
title: Notes
collapse: open
- 

```

```ad-important
title: Mindfulness
collapse: closed
## Mood:
- AM: 
- Mid-Day: 
- PM:

## Daily Affirmations
-
```
```ad-question
title: Positive Self Awareness
collapse: open
## What Positive Things Happened Today?
- 

## What Am I Grateful For Today?
- 

## What Did I Do For Myself Today?
- 
```
```ad-warning
title: What Could I Improve On For Tomorrow?
collapse: closed
- 

```