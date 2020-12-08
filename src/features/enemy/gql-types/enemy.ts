/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: enemy
// ====================================================

export interface enemy_randomEnemy_damage {
  __typename: "enemyDamage";
  max: number;
  min: number;
}

export interface enemy_randomEnemy {
  __typename: "enemy";
  hp: number;
  avatarUrl: string;
  attackSpeed: number;
  damage: enemy_randomEnemy_damage;
  name: string;
  quotes: string[];
}

export interface enemy {
  randomEnemy: enemy_randomEnemy | null;
}
