import { HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token=localStorage.getItem('token');


  if (token)
    {
      console.log('token');
      console.log(token);
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}`}});
    }

  return next(req);
};
