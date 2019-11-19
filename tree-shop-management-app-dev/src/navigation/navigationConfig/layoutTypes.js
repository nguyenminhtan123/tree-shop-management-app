import { isString, isArray } from 'lodash';

// Component layout holds a single react component.

/* 
  Example: component(
  'testing',
  {},
  {
    statusBar: {
      visible: false
    }
  }
);

It will return like this: 
{
   "component": {
      "name": "testing",
      "passProps": {},
      "options": {
         "statusBar": {
            "visible": false
         }
      }
   }
}
*/
export const component = (component, passProps, options, id = null) => {
  return isString(component)
    ? { component: { id: id, name: component, passProps, options } }
    : component;
};

// Support children layouts of any kind. A stack can be initialised with more than one screen, in which case the last screen will be presented at the top of the stack.
/* 
  Example: stack([
  component(
    'testing',
    {},
    {
      statusBar: {
        visible: false
      }
    }
  ),
  component(
    'login',
    {},
    {
      statusBar: {
        visible: true
      }
    }
  )
]);

  It will return like this: 
  {
    "stack": {
       "children": [
          {
             "component": {
                "name": "testing",
                "passProps": {},
                "options": {
                   "statusBar": {
                      "visible": false
                   }
                }
             }
          },
          {
             "component": {
                "name": "login",
                "passProps": {},
                "options": {
                   "statusBar": {
                      "visible": true
                   }
                }
             }
          }
       ]
    }
 }
*/
export const stack = (rawChildren, options) => {
  const childrenArray = isArray(rawChildren) ? rawChildren : [rawChildren];
  const children = childrenArray.map(child => component(child));
  return {
    stack: {
      children,
      options: options
    }
  };
};

//BottomTabs layouts
/* 
  Example: bottomTabs([stack(component('testing')), component('login')]);
It will return like this: 
{
  "bottomTabs": {
     "children": [
        {
           "stack": {
              "children": [
                 {
                    "component": {
                       "name": "testing"
                    }
                 }
              ]
           }
        },
        {
           "component": {
              "name": "login"
           }
        }
     ]
  }
}
*/
export const bottomTabs = (children, options) => {
  const bottomTabs = {
    children: isArray(children) ? children : [children],
    options: options
  };

  return { bottomTabs: bottomTabs };
};

//Sidemenu layouts
/* 
  Example: sideMenu(component('leftScreen'), component('login'), {});  (1)
          sideMenu(
            component('leftScreen'),
            [stack(component('testing')), component('login')],
            {},
            true
          ); (2)

It will return like this: 
(1) {
  "sideMenu": {
     "left": {
        "component": {
           "name": "leftScreen"
        }
     },
     "center": {
        "stack": {
           "children": [
              {
                 "component": {
                    "name": "login"
                 }
              }
           ],
           "options": {}
        }
     }
  }
}

(2) {
  "sideMenu": {
     "left": {
        "component": {
           "name": "leftScreen"
        }
     },
     "center": {
        "bottomTabs": {
           "children": [
              {
                 "stack": {
                    "children": [
                       {
                          "component": {
                             "name": "testing"
                          }
                       }
                    ]
                 }
              },
              {
                 "component": {
                    "name": "login"
                 }
              }
           ],
           "options": {}
        }
     }
  }
}
*/

export const sideMenu = (
  leftSideMenu,
  children,
  options,
  forBottomTabs = false
) => {
  const center = forBottomTabs
    ? bottomTabs(children, options)
    : stack(children, options);
  const sideMenu = {
    left: leftSideMenu,
    center: center
  };
  return { sideMenu: sideMenu };
};
