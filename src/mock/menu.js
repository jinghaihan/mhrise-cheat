const menu = [
  {
    title: '首页',
    icon: 'home',
    target: 'home',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '道具',
    icon: 'shopping',
    target: 'item',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '护石',
    icon: 'gift',
    target: 'talisman',
    activeRule: '/mhrise-cheat/',
    children: []
  },
  {
    title: '随从',
    icon: 'heart',
    target: 'buddy',
    activeRule: '',
    children: [
      {
        title: '等级',
        icon: 'fire',
        target: 'level',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '技能',
        icon: 'thunderbolt',
        target: 'skills',
        activeRule: '/mhrise-cheat/',
        children: []
      }
    ]
  },
  {
    title: '狩猎记录',
    icon: 'read',
    target: 'huntingLog',
    activeRule: '',
    children: [
      {
        title: '狩猎数/捕获数',
        icon: 'profile',
        target: 'count',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '金冠',
        icon: 'crown',
        target: 'crowns',
        activeRule: '/mhrise-cheat/',
        children: []
      }
    ]
  },
  {
    title: '公会名片',
    icon: 'idcard',
    target: 'guildCards',
    activeRule: '',
    children: [
      {
        title: '猎人等级',
        icon: 'rise',
        target: 'hunterRank',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '任务完成次数',
        icon: 'number',
        target: 'questCompleted',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '武器使用次数',
        icon: 'bar-chart',
        target: 'weaponUsage',
        activeRule: '/mhrise-cheat/',
        children: []
      },
      {
        title: '勋章',
        icon: 'trophy',
        target: 'awards',
        activeRule: '/mhrise-cheat/',
        children: []
      }
    ]
  }
]

export default menu
