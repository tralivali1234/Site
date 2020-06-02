﻿using IsraelHiking.Common.Api;
using OsmSharp.Changesets;
using System.Threading.Tasks;

namespace IsraelHiking.API.Services.Osm
{
    /// <summary>
    /// This service is responsible for updating the database with change made in OSM
    /// </summary>
    public interface IDatabasesUpdaterService
    {
        /// <summary>
        /// This method is responsible of taking the changes, converting them and updating the database,
        /// It also fetches latest data from OSM just before updating the database
        /// </summary>
        /// <param name="changes">A list of changes occurred since last run</param>
        /// <returns></returns>
        Task Update(OsmChange changes);

        /// <summary>
        /// This method is responsible for rebuilding the database from the OSM pbf stream
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task Rebuild(UpdateRequest request);
    }
}