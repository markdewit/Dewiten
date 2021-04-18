using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API
{
    public class ActivitiesController : BaseApiController
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> getActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //activities/id
        public async Task<ActionResult<Activity>> getActivity(Guid id){

            return await _context.Activities.FindAsync(id);
        }
    }
}