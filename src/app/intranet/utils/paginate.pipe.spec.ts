import { PaginateAirportsPipe } from './paginate.pipe';

describe('PaginatePipe', () => {
  it('create an instance', () => {
    const pipe = new PaginateAirportsPipe();
    expect(pipe).toBeTruthy();
  });
});
