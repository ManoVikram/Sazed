package handlers

import (
	"fmt"
	"net/http"

	"github.com/ManoVikram/AI-Research-Assistant/backend/api/models"
	pb "github.com/ManoVikram/AI-Research-Assistant/backend/api/proto"
	"github.com/ManoVikram/AI-Research-Assistant/backend/api/services"
	"github.com/gin-gonic/gin"
)

func ResearchHandler(services *services.Services) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Step 1 - Unmarshal the request body
		var request models.ResearchRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid request body: %v", err.Error())})
			return
		}

		// Step 2 - Call the gRPC service to get the research response
		grpcResponse, err := services.AIClient.Research(c.Request.Context(), &pb.ResearchRequest{
			Query: request.Query,
		})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to get research response: %v", err.Error())})
			return
		}

		// Step 3 - Map the gRPC response to the HTTP response model
		response := models.ResearchResponse{
			Summary:   grpcResponse.Summary,
			Resources: grpcResponse.Resources,
			Critique:  grpcResponse.Critique,
		}

		// Step 4 - Return the response
		c.JSON(http.StatusOK, response)
	}
}
