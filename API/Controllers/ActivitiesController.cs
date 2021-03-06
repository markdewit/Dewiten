using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> getActivities()
        {
            return HandlerResult(await Mediator.Send(new List.Query()));
        }
  
        [HttpGet("{id}")] //activities/id
        public async Task<IActionResult> GetActivity(Guid id)
        {
          
            return HandlerResult(await Mediator.Send(new Details.Query{Id = id}));

        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity){

            return Ok(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAvtivity(Guid id, Activity activity){
            activity.Id = id;
            return HandlerResult(await Mediator.Send(new Edit.Command{Activity= activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandlerResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}