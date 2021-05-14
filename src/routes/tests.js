import express from 'express';
const router = express.Router();

import {
    body,
    validationResult
} from 'express-validator';
import Test from '../models/test';

router
    .get('/tests',

        async (req, res) => {

            const tests = await Test.findAll();

            res.json({
                data: tests
            });
        })

    .post('/tests',

        body('name').isString(),

        body('body').isString(),

        async (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            }

            const test = await Test.create({
                name: req.body.name,
                body: req.body.body,
            });

            res
                .status(201)
                .json({
                    data: test
                });
        })

    .get('/tests/:id',

        async (req, res) => {

            const test = await Test.findOne({
                where: {
                    id: req.params.id
                }
            });

            if (!test) return handle404(req, res);

            res
                .json({
                    data: test
                });
        })

    .put('/tests/:id',


        body('name').isString(),

        body('body').isString(),

        async (req, res) => {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array()
                });
            }

            const rowsAffected = await Test.update({
                name: req.body.name,
                body: req.body.body,
            }, {
                where: {
                    id: req.params.id
                }
            });

            if (rowsAffected < 1) return handle404(req, res);

            const test = await Test.findOne({
                where: {
                    id: req.params.id
                }
            });

            res
                .status(200)
                .json({
                    data: test
                });
        })

    .delete('/tests/:id',

        async (req, res) => {

            await Test.destroy({
                where: {
                    id: req.params.id
                }
            });

            res
                .status(200)
                .json();
        })

export default router

const handle404 = (req, res) => {
    return res
        .status(404)
        .json({
            error: 'Resource does not exist'
        })
}