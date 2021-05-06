import {makeAutoObservable, runInAction, values} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
activitieRegistry = new Map<string,Activity>();
selectedActivity: Activity | undefined = undefined;
editMode = false;
loading = false;
loadingInitial = true;

      constructor(){
            makeAutoObservable(this)
      }

      get activitiesByDate(){
            return Array.from(this.activitieRegistry.values()).sort((a, b) => 
                  Date.parse(a.date) - Date.parse(b.date));
      }
      

      loadActivities = async () => {
            try{
                  const activities = await agent.Activities.list();
                        activities.forEach(activity => {
                              activity.date = activity.date.split('T')[0];
                              this.activitieRegistry.set(activity.id,activity);
                            })
                            this.setloadingInitial(false);
            } catch (error)
            {
                  console.log('error: ' + error);
                        this.setloadingInitial(false);                
            }
      }

      setloadingInitial = (stat: boolean) => {
            this.loadingInitial= stat;
      }

      selectActivity = (id: string) => {
            this.selectedActivity = this.activitieRegistry.get(id);
      }

      cancelSelectedActivty = () => {
            this.selectedActivity = undefined;
      }

      openForm = (id? : string) => {
            id ? this.selectActivity(id) : this.cancelSelectedActivty();
          this.editMode = true;
      }

      closeForm = () =>{
            this.editMode = false;
      } 

      createActivity = async (activity : Activity) => {
            this.loading = true;
            activity.id = uuid();
            try{
                  await agent.Activities.create(activity)
                  runInAction(() => {
                        this.activitieRegistry.set(activity.id,activity);
                        this.selectedActivity = activity;
                        this.editMode = false;
                        this.loading= false; 
                  })

            }catch (error) {
                  console.log("error: " + error);
                  runInAction(() => {
                        this.loading= false; 
                  })
            }

      }

      updateActivity = async (activity: Activity) => {
         this.loading = true;
         try{
               await agent.Activities.update(activity);
               runInAction(() => {
                  this.activitieRegistry.set(activity.id, activity);              
                  this.selectedActivity = activity;
                  this.editMode = false;
                  this.loading= false; 
            })
         } catch (error) {
               console.log("error:" + error)
               runInAction(() => {
                  this.loading= false; 
               })
         }
            
      }

      deleteActivity= async (id :string)=>{
            this.loading = true;
            try{
                  await agent.Activities.delete(id);
                  runInAction(() => {                 
                        this.activitieRegistry.delete(id);
                        if (this.selectedActivity?.id === id) this.cancelSelectedActivty(); 
                        this.loading= false;
                  })
            }
            catch (error) {
                  console.log("error: " + error)
                  runInAction(() => {
                        this.loading= false;
                  })
            }
      }
}
