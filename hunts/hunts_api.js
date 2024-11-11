const itemsPool = require('../db/db.js');

module.exports = function(app) {
    app.get('/hunts', async (req, res) => {
        const allHunts = await(itemsPool.query('select * from job_hunt'));
        res.json(allHunts.rows);
    });
    
    app.get('/hunts/:id', async (req, res) => {
        const hunt = await(itemsPool.query('select * from job_hunt where id = $1', [req.params.id]));
        res.json(hunt.rows[0]);
    });

    app.post('/hunts', async (req, res) => {
        const newHunt = await itemsPool.query('INSERT INTO job_hunt (user_id, name, start_date\)\
                                        VALUES ($1,$2,$3) returning *',
                                    [req.body.user_id, req.body.name, req.body.start_date]);
        res.json(newHunt.rows[0]);
    });

    app.put('/hunts/:id', async (req, res) => {
        const existing = await itemsPool.query('select 1 from job_hunt where id = $1', [req.params.id]);
        if (existing.rowCount === 0) {
            var hunt = itemsPool.query('INSERT INTO job_hunt (id, user_id, name, start_date, resolution_date\)\
                                        VALUES ($1,$2,$3,$4,$5) returning *',
                                    [req.params.id,req.body.user_id, req.body.name, req.body.start_date, req.body.resolution_date]);
        } else {
            var hunt = itemsPool.query('update job_hunt set user_id = $1, name = $2, start_date = $3, resolution_date = $4 where id = $5 returning *',
            [req.body.userId, req.body.name, req.body.start_date, req.body.resolution_date, req.params.id]);
        }
        res.json(hunt);
    });
}