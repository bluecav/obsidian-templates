---
cssclasses:
  - cards,
  - cards-cover,
  - cards-2-3,
  - table-max
folder: 90 - Templates/10 - Notes
galleryColumns: 10
galleryHeight: 100
galleryType: vertical
icon: FarNoteSticky
tags: ""
title: daily-template 1
---

> [!date] **DATE: {{date:YYYY-MM-DD}} **
> 

>[!tasks]- Tasks
>```tasks
> not done
> group by filename 
> sort by due reverse 
> sort by description
> ```

> [!tasks]- Todist Tasks:
> ```todoist 
> name: Highest Priority & Date 
> filter: "today | overdue" 
> sorting: 
>   - date 
>   - priority 
>group: true 
>```

>[!therapy]- Therapy Note:
> Therapy Notes [[/02 - Therapy/2024/04-April/therapy-template]]
> ```dataview 
LIST rows.L.text
FROM "" 
FLATTEN file.lists as L
WHERE contains(L.tags, "#therapy-topic")
WHERE date(today) - file.mday <= dur(7 days) SORT file.mtime DESC
GROUP BY file.link


>[!notes]+ Notes:
> - 
>


>[!attachments]- Attachments:
> `$= await dv.view("99 - Data/js/buildImgGallery")`


>[!mindfullness]-  [[Self Improvement/Self Care/Daily Affirmations]]
> - 
>
>


>[!positivity]- What positive things did you notice today?
> - 


>[!positivity]- What am I grateful for today?
> - 


>[!positivity]- What did I do for myself today?
> - 


>[!negative]- What can I improve on for tomorrow?
> -