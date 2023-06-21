export const transformData = (data, base64FilesArray) => {
    data.concerntype = data.concernType
    delete data.concernType
    data.issuetype = data.issueType
    delete data.issueType
    data.requestername = data.requesterName
    delete data.requesterName
    data.requesteremail = data.requesterEmail
    delete data.requesterEmail
    data.ticketstatus = data.ticketStatus
    delete data.ticketStatus
    data.assignedto = data.assignedTo
    delete data.assignedTo
    data.prioritytype = data.priority
    delete data.priority
    data.attachment = base64FilesArray
    delete data.attachments
    data.comment = data.comments
    delete data.comments
  
    return data
  }