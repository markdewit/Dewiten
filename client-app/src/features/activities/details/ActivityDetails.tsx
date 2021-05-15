import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivitydetailedChat from './ActivityDetailedChat';
import ActivitydetailedHeader from './ActivityDetailedHeader';
import ActivitydetailedInfo from './ActivityDetailedInfo';
import ActivitydetailedSideBar from './ActivityDetailedSideBar';


 
export default observer( function Activitydetails(){
      const {activityStore} = useStore();
      const {selectedActivity : activity , loadActivitiy, loadingInitial } = activityStore;
      const {id} = useParams<{id: string}>(); 

      useEffect(() => {
            if (id) loadActivitiy(id);
      }, [id, loadActivitiy]);
      if (loadingInitial || !activity) return <LoadingComponent/>;

      return(
      <Grid>
             <Grid.Column width={10}>
                   <ActivitydetailedHeader activity={activity} />
                   <ActivitydetailedInfo activity={activity}/>
                   <ActivitydetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                   <ActivitydetailedSideBar/>
            </Grid.Column>    
      </Grid>
      )

})