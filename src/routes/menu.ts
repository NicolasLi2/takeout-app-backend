import express from 'express';

const router = express.Router();

router.get('/');
router.post('/create-menu', createMenu);
