<?php
namespace App\Libraries;
/**
 * php-statuscake.
 *
 * PHP service wrapper for the statuscake.com PUSH test : https://push.statuscake.com
 *
 * @author Laurent RICHARD <easylo@gmail.com>
 *
 * @version 0.2
 *
 * @example test.php
 *
 * @link https://push.statuscake.com
 *
 * @license BSD License
 */
class Statuscake
{
    // push url
    const URL = 'https://app.statuscake.com/API/';

    
    const API = "xdBjX6kDVLSqKWAxTNej";
    const username = "server4sale";

    /**
     * Account token.
     *
     * @var string
     */
    private $_token;

    /**
     * Test Id.
     *
     * @var string
     */
    private $_testId;

    /**
     * Time.
     *
     * @var string
     */
    private $_time;

    /**
     * Application API token.
     *
     * @var string
     */
    private $_statusCode;

    /**
     * User.
     *
     * @var string
     */
    private $_user;

    /**
     * Default constructor.
     */
    public function __construct()
    {
    }

    /**
     * Set API token.
     *
     * @param string $token Your app API key.
     */
    public function setAccountToken($token)
    {
        $this->_token = (string) $token;
    }

    /**
     * Get API token.
     *
     * @return string
     */
    public function getAccountToken()
    {
        return $this->_token;
    }

    /**
     * Set API token.
     *
     * @param string $token Your app API key.
     */
    public function setTestId($testId)
    {
        $this->_testId = (string) $testId;
    }

    /**
     * Get API token.
     *
     * @return string
     */
    public function getTestId()
    {
        return $this->_testId;
    }


    public static function getTests()
    {

        $endpoint="Tests";
        $requestType="GET";
        $data=[];

        $tests=self::send($endpoint,$requestType,$data);
        // echo json_encode($tests);
        // die();
        // var_dump($tests);

        return $tests;
    }


    public static function getTest($testId)
    {

        $endpoint="Tests";
        $requestType="GET";
        $data=['TestID'=> $testId];

        $tests=self::send($endpoint,$requestType,$data);
        echo json_encode($tests);
        die();
        // var_dump($tests);

        return $tests;
    }

    /**
     * Set API token.
     *
     * @param string $token Your app API key.
     */
    public function setTime($time)
    {
        $this->_time = (string) $time;
    }

    /**
     * Get API token.
     *
     * @return string
     */
    public function getTime()
    {
        return $this->_time;
    }

    /**
     * Set API token.
     *
     * @param string $token Your app API key.
     */
    public function setStatusCode($statusCode)
    {
        $this->_statusCode = (string) $statusCode;
    }

    /**
     * Get API token.
     *
     * @return string
     */
    public function getStatusCode()
    {
        return $this->_statusCode;
    }

    /**
     * Set API user.
     *
     * @param string $user The user's API key.
     */
    public function setUser($user)
    {
        $this->_user = (string) $user;
    }

    /**
     * Get API user.
     *
     * @return string
     */
    public function getUser()
    {
        return $this->_user;
    }

    /**
     * Send message to Pushover API.
     *
     * @return bool
     */
    public static function send($endpoint,$requestType,$data)
    {
        // if ($this->getStatusCode() < 400) {
            // $ch = curl_init();
            // curl_setopt($ch, CURLOPT_URL, self::Endpoint.sprintf(self::PUSH_URL_SETTINGS, $this->getAccountToken(), $this->getTestId(), $this->getTime()));


                $ch = curl_init(self::URL.$endpoint);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $requestType);
                if(count($data)>0)
                {
                    curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));    
                }
                
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                       "API: ".self::API,
                       "Username: ".self::username
                ));
                // For Debugging
                $response = curl_exec($ch);
                $response = json_decode($response);



            // curl_setopt($ch, CURLOPT_HEADER, false);

            // Output contains the response (success / failure)
            // $output = curl_exec($ch);
            // Close the curl session
            curl_close($ch);
            return $response;
        // }
    }
}
