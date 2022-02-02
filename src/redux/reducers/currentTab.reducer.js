// Used to keep track of which bottom navigation tab is selected
const currentTab = (state = 0, action) => {
    switch (action.type) {
      case 'SET_TAB':
        return action.payload;
      default:
        return state;
    }
}
  
export default currentTab;