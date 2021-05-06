import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/loadingComponent';
import { useStore } from '../../../app/stores/store';


 
export default function Activitydetails(){
      const {activityStore} = useStore();
      const {selectedActivity : activity, openForm, cancelSelectedActivty} = activityStore; 


      if (!activity) return <LoadingComponent/>;

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
                        <Button basic onClick={() => openForm(activity.id)}  color='blue' content='Edit'/>
                        <Button onClick={cancelSelectedActivty} basic color='grey' content='cancel'/>
                  </Button.Group>
            </Card.Content>
          </Card>
      )

}