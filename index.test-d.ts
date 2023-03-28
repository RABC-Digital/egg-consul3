import { expectType } from 'tsd';
import { Application } from 'egg';
import { EggConsul } from '.';

const app = new Application();

expectType<EggConsul>(app.consul);
