// @flow

declare var module: {
  hot: {
    accept: (path: ?string, callback: ?() => void) => void
  }
};

export type LoginProps = {
  history: RouterHistory
};

export type LoginState = {
  username: string,
  password: string,
  id: string,
  apiToken: string,
  tokenLogin: boolean
};

export type aLabelProp = {
  htmlFor: string
};

export type DashboardProps = {
  history: RouterHistory
};

export type HeaderProps = {
  history: RouterHistory
};

export type BasicUserStatsType = {
  buffs: {
    con: number,
    int: number,
    per: number,
    str: number
  },
  class: string,
  con: number,
  exp: number,
  hp: number,
  int: number,
  lvl: number,
  maxHealth: number,
  maxMP: number,
  mp: number,
  per: number,
  str: number,
  toNextLevel: number
};

export type UserPreferencesType = {
  chair: string,
  shirt: string,
  size: string,
  skin: string,
  sleep: boolean,
  costume: boolean,
  hair: {
    bangs: number,
    beard: number,
    base: number,
    color: string,
    flower: number,
    mustache: number
  }
};

export type UserItemsType = {
  currentMount: string,
  currentPet: string,
  gear: {
    costume: {
      armor: string,
      head: string,
      shield: string
    },
    equipped: {
      armor: string,
      back: string,
      back_collar: string,
      body: string,
      eyewear: string,
      head: string,
      headAccessory: string,
      shield: string,
      weapon: string
    }
  },
  pets: {
    [key: string]: number
  },
  mounts: {
    [key: string]: boolean
  }
};

export type UserAttributeStateDataType = {
  baseStat: {
    con: number,
    per: number,
    str: number,
    int: number
  },
  buff: {
    con: number,
    per: number,
    str: number,
    int: number
  },
  classBonus: {
    con: number,
    per: number,
    str: number,
    int: number
  },
  con: number,
  gearBonus: {
    con: number,
    per: number,
    str: number,
    int: number
  },
  int: number,
  levelBonus: {
    con: number,
    per: number,
    str: number,
    int: number
  },
  maxMP: number,
  per: number,
  str: number
};

export type HabitTypeHistoryProp = {
  date: number,
  value: number
};

export type HabitType = {
  _id: string,
  attribute: string,
  completed: boolean,
  history: Array<HabitTypeHistoryProp>,
  isDue: boolean,
  streak: number,
  text: string,
  type: string,
  tags: Array<string>
};

export type DailyTrendsType = {
  dailyHistory: Array<HabitType>,
  userHasDailies: boolean,
  dailiesLoaded?: boolean
};

export type TagType = {
  challenge: string,
  id: string,
  name: string
};

export type HabitTrendsType = {
  habitHistory: Array<HabitType>,
  userHasHabits: boolean,
  habitsLoaded: boolean
};

export type TaskTagsListInnerType = {
  [key: string]: Array<HabitType>
};

export type TaskTagsPropType = {
  userTasksByTag: { [key: string]: TaskTagsListInnerType },
  tagsLoaded: boolean,
  userHasTags: boolean
};

export type DashboardStateType = {
  achievements: {
    beastMaster: boolean,
    mountMaster: boolean
  },
  auth: {
    timestamps: {
      created: string
    }
  },
  stats: BasicUserStatsType,
  preferences: UserPreferencesType,
  items: UserItemsType,
  profile: {
    name: string
  },
  worldState: {
    statBreakdown: UserAttributeStateDataType,
    worldPets: {
      [key: string]: number
    },
    worldMounts: {
      [key: string]: boolean
    }
  },
  tasksOrder: {
    habits: Array<string>
  },
  habitTrends: HabitTrendsType,
  dailyTrends: DailyTrendsType,
  tags: Array<TagType>,
  tagsHolder: TaskTagsPropType
};

export type UserAttributesStateType = {
  showModal: boolean,
  modalReady: boolean,
  statBreakdown: UserAttributeStateDataType
};

export type UserAttributeModalType = {
  title: string,
  total: number,
  baseStat: number,
  classBonus: number,
  levelBonus: number,
  gearBonus: number,
  buffBonus: number,
  hideModal: Function
};
