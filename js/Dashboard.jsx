// @flow

import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';

import { getUser, getUserTasks, formattedErrorMessage } from './config';
import Header from './dash_components/Header';
import { MainWrapper } from './styling/styled';
import BasicUserStats from './dash_components/BasicUserStats';
import OverviewShields from './dash_components/OverviewShields';
import OverviewSteedsPets from './dash_components/OverviewSteedsPets';
import { getHabiticaContent } from './habitica_helpers/habiticaHelp';
import HabitTrends from './dash_components/HabitTrends';
import DailyTrends from './dash_components/DailyTrends';
import TaskTags from './dash_components/TaskTags';
import Footer from './Footer';

function filterTaskListForTaskTypeAndReturnBooleans(taskList: Array<HabitType>, taskType: string) {
  const taskHistory = taskList.filter(val => val.type === taskType);
  const loaded = true;
  let hasTasks = false;

  if (taskHistory.length > 0) {
    hasTasks = true;
  }

  return { taskHistory, loaded, hasTasks };
}

function filterByTagsAndReturnBooleans(tagsList: Array<TagType>, userTasks: Array<HabitType>) {
  const payload = {};
  const loaded = true;
  let hasTags = false;
  if (tagsList.length > 0) {
    hasTags = true;
  }

  // loop through each id that exists in the tagsList.
  tagsList.forEach(val => {
    const innerPayload = userTasks.filter(innerVal => innerVal.tags.includes(`${val.id}`));
    payload[val.id] = { [val.name]: [...innerPayload] };
  });

  return { payload, loaded, hasTags };
}

class Dashboard extends Component<DashboardProps, DashboardStateType> {
  state = {
    achievements: {
      beastMaster: false,
      mountMaster: false
    },
    auth: {
      timestamps: {
        created: '2015-04-17T18:20:29.067Z'
      }
    },
    profile: {
      name: 'test name'
    },
    stats: {
      buffs: {
        con: 0,
        int: 0,
        per: 0,
        str: 0
      },
      class: 'rogue',
      con: 0,
      exp: 0,
      hp: 0,
      int: 0,
      lvl: 0,
      maxHealth: 50,
      maxMP: 50,
      mp: 0,
      per: 0,
      str: 0,
      toNextLevel: 50
    },
    preferences: {
      chair: '',
      costume: false,
      hair: {
        bangs: 0,
        base: 0,
        beard: 0,
        color: '',
        flower: 0,
        mustache: 0
      },
      shirt: '',
      size: '',
      skin: '',
      sleep: false
    },
    items: {
      currentMount: '',
      currentPet: '',
      gear: {
        costume: {
          armor: '',
          head: '',
          shield: ''
        },
        equipped: {
          armor: '',
          back: '',
          back_collar: '',
          body: '',
          eyewear: '',
          head: '',
          headAccessory: '',
          shield: '',
          weapon: ''
        }
      },
      pets: {},
      mounts: {}
    },
    worldState: {
      statBreakdown: {
        baseStat: {
          con: 0,
          per: 0,
          str: 0,
          int: 0
        },
        buff: {
          con: 0,
          per: 0,
          str: 0,
          int: 0
        },
        classBonus: {
          con: 0,
          per: 0,
          str: 0,
          int: 0
        },
        con: 0,
        gearBonus: {
          con: 0,
          per: 0,
          str: 0,
          int: 0
        },
        int: 0,
        levelBonus: {
          con: 0,
          per: 0,
          str: 0,
          int: 0
        },
        maxMP: 0,
        per: 0,
        str: 0
      },
      worldPets: {},
      worldMounts: {}
    },
    tasksOrder: {
      habits: []
    },
    tags: [],
    habitTrends: {
      habitHistory: [],
      userHasHabits: false,
      habitsLoaded: false
    },
    dailyTrends: {
      dailyHistory: [],
      userHasDailies: false,
      dailiesLoaded: false
    },
    tagsHolder: {
      userTasksByTag: {},
      userHasTags: false,
      tagsLoaded: false
    }
  };

  async componentDidMount() {
    try {
      const user: DashboardStateType = await getUser();
      toast.success('Success! You have been redirected to the dashboard');
      /* eslint-disable */
      this.setState(user);
      /* eslint-enable */

      const worldState = await getHabiticaContent(user);
      /* eslint-disable */
      this.setState({ worldState });
      /* eslint-enable */

      // get all the tasks for a user
      const userTasks = await getUserTasks();

      const { payload: userTasksByTag, loaded: tagsLoaded, hasTags: userHasTags } = filterByTagsAndReturnBooleans(
        user.tags,
        userTasks
      );
      /* eslint-disable */
      this.setState({ tagsHolder: { userTasksByTag, tagsLoaded, userHasTags } });
      /* eslint-enable */

      const {
        taskHistory: dailyHistory,
        loaded: dailiesLoaded,
        hasTasks: userHasDailies
      } = filterTaskListForTaskTypeAndReturnBooleans(userTasks, 'daily');

      const {
        taskHistory: habitHistory,
        loaded: habitsLoaded,
        hasTasks: userHasHabits
      } = filterTaskListForTaskTypeAndReturnBooleans(userTasks, 'habit');

      /* eslint-disable */
      this.setState({
        habitTrends: { habitHistory, userHasHabits, habitsLoaded },
        dailyTrends: { dailyHistory, dailiesLoaded, userHasDailies }
      });
      /* eslint-enable */
    } catch (error) {
      toast.error(formattedErrorMessage(error.name), {
        autoClose: 15000
      });
      this.props.history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    const { beastMaster, mountMaster } = this.state.achievements;
    const { pets, mounts } = this.state.items;
    const { worldPets, worldMounts } = this.state.worldState;
    const { habitHistory, userHasHabits, habitsLoaded } = this.state.habitTrends;
    const { dailyHistory, userHasDailies, dailiesLoaded } = this.state.dailyTrends;
    const { userTasksByTag, tagsLoaded, userHasTags } = this.state.tagsHolder;
    return (
      <Fragment>
        <Header history={history} />
        <MainWrapper>
          <BasicUserStats {...this.state} />
          <OverviewShields username={this.state.profile.name} createdOn={this.state.auth.timestamps.created} />
          <OverviewSteedsPets
            beastMaster={beastMaster}
            mountMaster={mountMaster}
            pets={pets}
            mounts={mounts}
            worldPets={worldPets}
            worldMounts={worldMounts}
          />
          <HabitTrends habitHistory={habitHistory} userHasHabits={userHasHabits} habitsLoaded={habitsLoaded} />
          <DailyTrends dailyHistory={dailyHistory} userHasDailies={userHasDailies} dailiesLoaded={dailiesLoaded} />
          <TaskTags userTasksByTag={userTasksByTag} tagsLoaded={tagsLoaded} userHasTags={userHasTags} />
        </MainWrapper>
        <Footer />
      </Fragment>
    );
  }
}
export default Dashboard;
