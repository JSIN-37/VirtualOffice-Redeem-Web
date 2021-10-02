export const documentPermissions = {
  publicSharing : {
    description : 'Share docs with people outside organization',
    value : false
  }
}

export const personalTaskPermisssions = {
  createTask : {
    description : 'Create a task only visible for the employee',
    value : false
  },
  editTask : {
    description : 'Edit a self created task',
    value : false
  },
  assignTask: {
    description  : 'Assign a task to yourself',
    value : false
  },
  comment : {
    description : 'comment on a self created task',
    value : false
  },
  removeTask : {
    description : 'Remove a self assigned task',
    value : false
  },
  reviewTask:{
    description : 'Review a self assigned task',
    value:false
  }
}

export const ownDivisionTaskPermissions = {
  createTask : {
    description : 'Create a task for the division',
    value : false
  },
  editTask : {
    description : 'Edit a task that was created for the division',
    value : false
  },
  assignTask: {
    description  : 'Assign a task to people in your division',
    value : false
  },
  comment : {
    description : 'comment on a task that is within your division( owned by division?? )',
    value : false
  },
  removeTask : {
    description : 'Remove a task from your own division',
    value : false
  },
  reviewTask:{
    description : 'Review an assigned task',
    value:false
  }
}

export const allDivisionsTaskPermissions = {
  createTask : {
    description : 'Create a task spanning different divisions',
    value : false
  },
  editTask : {
    description : 'Edit a created task',
    value : false
  },
  assignTask: {
    description  : 'Assign a task to people in any division',
    value : false
  },
  comment : {
    description : 'comment on a task in any division',
    value : false
  },
  removeTask : {
    description : 'Remove an assigned task from any division',
    value : false
  },
  reviewTask:{
    description : 'Review a task',
    value:false
  }
}

export const teamPermissions = {
  createTeam : {
    description : 'create a team',
    value :false
  }
}