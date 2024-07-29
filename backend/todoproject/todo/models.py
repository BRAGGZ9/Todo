from django.db import models

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    image = models.ImageField(upload_to='images/', blank=True, null=True)  

    def __str__(self):
        return self.title
