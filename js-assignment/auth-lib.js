class USER
{
  constructor(_name, _password)
  {
    this.name = _name;
    this.password = _password;
    this.groups = [];
  }
}
class GROUP
{
  constructor(_name)
  {
    this.name = _name;
    this.rights = [];
  }
}
let user_list = [];
let group_list = [];
let rights_list = [];
// Возвращает массив всех пользователей.
function users() { return user_list;}

//Создает нового пользователя с указанным логином username и паролем password, возвращает созданного пользователя.
function createUser(name, password) 
{
  user_list.push(new USER(name, password));
  return user_list[user_list.length - 1];
}

// Удаляет пользователя user
function deleteUser(user) 
{
  const check = (element) => element == user;
  if (!user)
  {
    throw Error("Bad argument");
  }
  if (!user_list.some(check))
  {
    throw Error("User not found");
  }
  user_list = user_list.filter(item => item !== user)
  return undefined;
}
// Возвращает массив групп, к которым принадлежит пользователь user
function userGroups(user) 
{
  let reuslt;
  user_list.forEach(element => {
    if (element === user)
    {
      reuslt = element.groups;
    }
  });
  return reuslt;
}
// Добавляет пользователя user в группу group
function addUserToGroup(user, group) 
{
  let check_user = false, check_group = false;
  user_list.forEach(element => {
    if (element === user)
    {
      check_user = true;
    }
  });
  group_list.forEach(element => {
    if (element === group)
    {
      check_group = true;
    }
  });
  if (!user || !group)
  {
    throw Error("Bad argument");
  }
  if (!check_user)
  {
    throw Error("User not found");
  }
  if (!check_group)
  {
    throw Error("Group not found");
  }
  user_list.forEach(element => {
    if (element === user)
    {
      element.groups.push(group);
    }
  });
  return undefined;
}

// Удаляет пользователя user из группы group. Должна бросить исключение, если пользователя user нет в группе group
function removeUserFromGroup(user, group) 
{
  let check_user = false, check_group = false, check_accessory;
  user_list.forEach(element => {
    if (element === user)
    {
      check_user = true;
    }
  });
  group_list.forEach(element => {
    if (element === group)
    {
      check_group = true;
    }
  });
  if (!user || !group)
  {
    throw Error("Bad argument");
  }
  if (!check_user)
  {
    throw Error("User not found");
  }
  if (!check_group)
  {
    throw Error("Group not found");
  }
  user_list.forEach(element => {
    if (element === user)
    {
      for (let i = 0; i < element.groups.length; i++)
      {
        if (element.groups[i] === group)
        {
          element.groups.splice(i, 1);
          check_accessory = true;
        }
      }
    }
  });
  if (!check_accessory)
  {
    throw Error("User was not a member of this group");
  }
  return undefined;
}

// Возвращает массив прав
function rights() { return rights_list;}

// Создает новое право с именем name и возвращает его
function createRight(name) 
{
  rights_list.push(name);
  return rights_list[rights_list.length - 1];
}

// Удаляет право right
function deleteRight(right) 
{
  if (!right)
  {
    throw Error("Bad argument");
  }
  if (rights_list.indexOf(right) === - 1)
  {
    throw Error("Right not found");
  }
  rights_list.splice(rights_list.indexOf(right), 1);
  group_list.forEach(element => {
    for (let i = 0; i < element.rights.length; i++)
      {
        if (element.rights[i] === right)
        {
          element.rights.splice(i, 1);
        }
      }
  });
  return undefined;
}

// Возвращает массив групп
function groups() { return group_list;}

// Создает новую группу и возвращает её.
function createGroup(name) 
{
  group_list.push(new GROUP(name));
  return group_list[group_list.length - 1];
}

// Удаляет группу group
function deleteGroup(group) 
{
  const check = (element) => element == group;
  if (!group)
  {
    throw Error("Bad argument");
  }
  if (!group_list.some(check))
  {
    throw Error("Group not found");
  }
  group_list = group_list.filter(item => item !== group)
  user_list.forEach(element => {
    for (let i = 0; i < element.groups.length; i++)
      {
        if (element.groups[i] === group)
        {
          element.groups.splice(i, 1);
        }
      }
  });
  return undefined;
}

// Возвращает массив прав, которые принадлежат группе group
function groupRights(group) 
{
  let reuslt;
  group_list.forEach(element => {
    if (element == group)
    {
      reuslt = element.rights;
    }
  });
  return reuslt;
}

// Добавляет право right к группе group
function addRightToGroup(right, group) 
{
  let check_group = false;
  if (!right || !group)
  {
    throw Error("Bad argument");
  }
  if (rights_list.indexOf(right) === - 1)
  {
    throw Error("Right not found");
  }
  group_list.forEach(element => {
    if (element === group)
    {
      check_group = true;
    }
  });
  if (!check_group)
  {
    throw Error("Group not found");
  }
  group_list.forEach(element => {
    if (element == group)
    {
      element.rights.push(right);
    }
  });
  return undefined;
}

// Удаляет право right из группы group. Должна бросить исключение, если права right нет в группе group
function removeRightFromGroup(right, group) 
{
  let check_group = false, check_accessory = false;
  if (!right || !group)
  {
    throw Error("Bad argument");
  }
  if (rights_list.indexOf(right) === - 1)
  {
    throw Error("Right not found");
  }
  group_list.forEach(element => {
    if (element === group)
    {
      check_group = true;
    }
  });
  if (!check_group)
  {
    throw Error("Group not found");
  }
  group_list.forEach(element => {
    if (element == group)
    {
      for (let i = 0; i < element.rights.length; i++)
      {
        if (element.rights[i] === right)
        {
          element.rights.splice(i, 1);
          check_accessory = true;
        }
      }
    }
  });
  if (!check_accessory)
  {
    throw Error("This right is not available in this group");
  }
  return undefined;
}

let authorizedUser = undefined;
function login(username, password) 
{
  let check_accessory = false;
  if (authorizedUser !== undefined)
  {
    return false;
  }
  user_list.forEach(element => {
    if (element.name === username && element.password === password)
    {
      authorizedUser = element;
      check_accessory = true;
    }
  });
  if (check_accessory)
  {
    return true;
  }
  else
  {
    return false;
  }
}

function currentUser() 
{
  if (authorizedUser !== undefined)
  {
    return authorizedUser;
  }
  else
  {
    return undefined;
  }
}

function logout() 
{
  authorizedUser = undefined;
}

function isAuthorized(user, right) 
{
  let check_accessory = false, check_user = false;
  if (!user || !right)
  {
    throw Error("Bad argument");
  }
  if (rights_list.indexOf(right) === - 1)
  {
    throw Error("Right not found");
  }
  user_list.forEach(element => {
    if (element === user)
    {
      check_user = true;
    }
  });
  if (!check_user)
  {
    throw Error("User not found");
  }
  user.groups.forEach(element => {
    element.rights.forEach(x => {
      if (x === right)
      {
        check_accessory = true;
      }
    });
  });
  if (check_accessory)
  {
    return true;
  }
  else
  {
    return false;
  }
}