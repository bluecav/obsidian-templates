<%* 
const meetingName = await tp.system.prompt("Meeting")
const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
-%>
# Metadata
meetingName:: <% meetingName + " - " + today %>
type:: standup
attendees:: 
