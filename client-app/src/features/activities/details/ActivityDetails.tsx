import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
      activity: Activity;
      cancelSelectActivity: () => void;
      openForm: (id: string) => void;
}
 
export default function Activitydetails({activity,cancelSelectActivity,openForm}: Props){
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
                        <Button onClick={cancelSelectActivity} basic color='grey' content='cancel'/>
                  </Button.Group>
            </Card.Content>
          </Card>
      )

}