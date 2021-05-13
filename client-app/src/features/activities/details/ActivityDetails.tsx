import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';


 
export default observer( function Activitydetails(){
      const {activityStore} = useStore();
      const {selectedActivity : activity , loadActivitiy, loadingInitial } = activityStore;
      const {id} = useParams<{id: string}>(); 

      useEffect(() => {
            if (id) loadActivitiy(id);
      }, [id, loadActivitiy]);
      if (loadingInitial || !activity) return <LoadingComponent/>;

      return(
            <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />
            <Card.Content>
              <Card.Header>{activity.title}</Card.Header>
              <Card.Meta>
                <span > {activity.date}</span>
              </Card.Meta>
              <Card.Description>
              {activity.description}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                  <Button.Group>
                        <Button as={Link} to={`/manage/${activity.id}`}  basic  color='blue' content='Edit'/>
                        <Button as={Link} to={'/activities'} basic color='grey' content='cancel'/>
                  </Button.Group>
            </Card.Content>
          </Card>
      )

})