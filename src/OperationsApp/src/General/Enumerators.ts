export enum AllRoles{
    SuperAdmin = 1,
    Admin = 2,
    FinalUser = 3
}

export enum FunctionalRoles{
    Admin = 2,
    FinalUser = 3
}

export const FunctionalRolesNames: Record<FunctionalRoles, string> = {
    [FunctionalRoles.Admin]: "Administrator",
    [FunctionalRoles.FinalUser]: "Normal User",
};

export enum Methods{
    Authenticate = 'Login/Authenticate',
    SaveAccount = 'Account/SaveAccount',
    GetAllAccounts = 'Account/GetAllAccounts',
    GetAccount = 'Account/GetAccount',
    SaveUser = 'Users/Save',
    UpdatePersonalInfo = 'Users/UpdatePersonalInfo',
    GetUser = 'Users/GetUser',
    GetUsers = 'Users/GetUsers',
    SaveTeam = 'Teams/SaveTeam',
    GetAllTeams = 'Teams/GetAllTeams',
    GetTeam = 'Teams/GetTeam',
    
    DeleteTeam = 'Teams/DeleteTeam',
    DeleteUser = 'Users/DeleteUser',
    DeleteAccount = 'Account/DeleteAccount',
    GetTeamsLogs = 'Teams/GetAllTeamsLogs',
}