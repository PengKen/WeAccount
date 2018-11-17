import { HOME,ACCOUNT,FOUND,PERSONAL,ADD }from './buttonNavigation'
import React from 'react'

const switchNav = function (component:string ,currentTarget:string) {

  switch(component){
    case 'HOME':
      return( <HOME currentTarget={currentTarget} /> );
    case 'ACCOUNT':
      return (<ACCOUNT currentTarget={currentTarget} />) ;
    case 'FOUND' :
      return (<FOUND currentTarget={currentTarget} /> );
    case 'PERSONAL':
      return (<PERSONAL currentTarget={currentTarget} />) ;
    case 'ADD':
      return <ADD currentTarget={currentTarget} /> ;
  }
}

export default function renderIcon(tab, component) {
  if (tab.focused) {//标签激活状态下icon的路径
    return switchNav(component,component)
  } else {                                  //未激活状态下的icon
    return switchNav(component,'NO_SELCETED')
  }
}