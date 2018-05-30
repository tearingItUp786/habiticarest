// @flow

import React, { Component } from 'react';
import { AvatarWrapper, CharacterSprite } from '../styling/styled';

class UserAvatar extends Component<{ preferences: UserPreferencesType, items: UserItemsType }, {}> {
  getGearClass = (gearType: string) => {
    const costumeClass = this.costumeClass();
    const result = this.props.items.gear[costumeClass][gearType];
    // console.log(result);
    return result;
  };

  costumeClass = () => (this.props.preferences.costume ? 'costume' : 'equipped');

  skinClass = () => {
    const { skin, sleep } = this.props.preferences;
    const baseClass = `skin_${skin}`;
    return `${baseClass}${sleep ? '_sleep' : ''}`;
  };

  render() {
    return (
      <AvatarWrapper>
        <CharacterSprite>
          {this.props.items.currentMount ? <span className={`Mount_Body_${this.props.items.currentMount}`} /> : null}
          <span className={`hair_flow_${String(this.props.preferences.hair.flower)}`} />
          <span className={`chair_${this.props.preferences.chair}`} />
          <span className={`${this.getGearClass('back')}`} />
          <span className={`${this.skinClass()}`} />
          <span className={`${this.props.preferences.size}_shirt_${this.props.preferences.shirt}`} />
          <span className="head_0" />
          <span className={`${this.props.preferences.size}_${this.getGearClass('armor')}`} />
          <span className={`${this.getGearClass('back_collar')}`} />
          <span className={`${this.getGearClass('body')}`} />
          {['bangs', 'base', 'mustache', 'beard'].map(value => (
            <span
              key={value}
              className={`hair_${value}_${this.props.preferences.hair[value]}_${this.props.preferences.hair.color}`}
            />
          ))}
          <span className={`${this.getGearClass('eyewear')}`} />
          <span className={`${this.getGearClass('head')}`} />
          <span className={`${this.getGearClass('headAccessory')}`} />
          <span className={`hair_flower_${this.props.preferences.hair.flower}`} />
          <span className={`${this.getGearClass('shield')}`} />
          <span className={`${this.getGearClass('weapon')}`} />
          {this.props.items.currentMount ? <span className={`Mount_Head_${this.props.items.currentMount}`} /> : null}
          {this.props.items.currentPet ? (
            <span style={{ bottom: 0, left: 0 }} className={`Pet-${this.props.items.currentPet}`} />
          ) : null}
        </CharacterSprite>
      </AvatarWrapper>
    );
  }
}

export default UserAvatar;
