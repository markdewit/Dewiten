using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Security.Claims;
using Domain;
using System.Text;
using System;
using Microsoft.Extensions.Configuration;

namespace API.Services
{
      public class TokenService
      {
            private readonly IConfiguration _config;

            public TokenService(IConfiguration config)
            {
                  _config = config;

            }
            public string CreateToken(AppUser user)
            {
                  var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),

            };

                  var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
                  var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
                  var tokenDescriptor = new SecurityTokenDescriptor
                  {
                        Subject = new ClaimsIdentity(claims),
                        Expires = DateTime.Now.AddDays(7),
                        SigningCredentials = creds

                  };

                  var tokenHandeler = new JwtSecurityTokenHandler();

                  var token = tokenHandeler.CreateToken(tokenDescriptor);

                  return tokenHandeler.WriteToken(token);

            }
      }
}