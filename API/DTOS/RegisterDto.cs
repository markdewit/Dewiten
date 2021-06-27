using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }   
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage="Password must have one lowercase one uppercase and at more than 4 chars")]
        public string Password { get; set; }    
        [Required]
        public string Username { get; set; }
    }
}