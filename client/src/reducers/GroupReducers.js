const groupReducer = (
  state = {
    groupData: [],
    currentgroupdata: {},
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    case "GET_ALL_GROUP":
      return { ...state, groupData: action.data,currentgroupdata:{} };
    case "GETTING_CURRENT_GROUP":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "GOT_CURRENT_GROUP":
      return {
        ...state,
        currentgroupdata: {
          group: action.data.group,
          messages: action.data.messages,
        },
        loading: false,
        error: false,
      };
    case "CREATE_GROUP_SUCCESS":
      const updatedGroupData = [...state.groupData, action.data];
      return {
        ...state,
        groupData: updatedGroupData,
        loading: false,
        error: false,
      };
    case "SEND_MESSAGE":
      const obj = { ...action.data };
      obj.sender = action.sender;
      state.currentgroupdata.messages.push(obj);
      return {
        ...state,
        loading: false,
        error: false,
      };
      case "RECEIVED_MESSAGE":
        console.log(action)
        if(state.currentgroupdata.group!=undefined){
        if(state.currentgroupdata.group._id===action.data.group){
          if(state.currentgroupdata.messages[state.currentgroupdata.messages.length-1]._id!=action.data._id){
            state.currentgroupdata.messages.push(action.data)
          }
        }
      }
        return {
          ...state,
          loading: false,
          error: false,
        };
    case "DELETE_GROUP":
      const newGroup = state.groupData.filter(
        (group) => group._id !== action.data
      );
      return {
        ...state,
        groupData: newGroup,
        currentgroupdata: {},
        loading: false,
        error: false,
      };
      case "UPDATE_GROUP_PIC":
        const updatedgrouppic=state.groupData.map((group)=>{
          if(group._id===action.groupid){
            group.group_Img=action.data
          }
          return group
        })
        const updatedcurrentpic={...state.currentgroupdata}
        updatedcurrentpic.group.group_Img=action.data
        return {
          ...state,
          groupData:updatedgrouppic,
          currentgroupdata:updatedcurrentpic,
          loading: false,
          error: false,
        };
        case "UPDATE_GROUP":
          const updatedgroup=state.groupData.map((group)=>{
            if(group._id===action.groupid){
              group.group_name=action.data.group_name
              group.group_description=action.data.group_description
            }
            return group
          })
          const updatedcurrent={...state.currentgroupdata}
          updatedcurrent.group.group_description=action.data.group_description
          updatedcurrent.group.group_name=action.data.group_name
          return {
            ...state,
            groupData:updatedgroup,
            currentgroupdata:updatedcurrent,
            loading: false,
            error: false,
          };
    default:
      return state;
  }
};
export default groupReducer;
